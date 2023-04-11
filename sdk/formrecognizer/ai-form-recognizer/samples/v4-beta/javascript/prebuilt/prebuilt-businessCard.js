// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-businessCard
// Description: Extract key information from business cards.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract key information from business cards.
 */
const PrebuiltBusinessCardModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-businessCard",
    description: "Extract key information from business cards.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
    docTypes: {
      businessCard: {
        buildMode: "template",
        fieldSchema: {
          ContactNames: {
            type: "array",
            items: {
              type: "object",
              description: "Contact name",
              example: "Chris Smith",
              properties: {
                FirstName: {
                  type: "string",
                  description: "First (given) name of contact",
                  example: "Chris",
                },
                LastName: {
                  type: "string",
                  description: "Last (family) name of contact",
                  example: "Smith",
                },
              },
            },
          },
          CompanyNames: {
            type: "array",
            items: {
              type: "string",
              description: "Company name",
              example: "CONTOSO",
            },
          },
          JobTitles: {
            type: "array",
            items: {
              type: "string",
              description: "Job title",
              example: "Senior Researcher",
            },
          },
          Departments: {
            type: "array",
            items: {
              type: "string",
              description: "Department or organization",
              example: "Cloud & AI Department",
            },
          },
          Addresses: {
            type: "array",
            items: {
              type: "address",
              description: "Address",
              example: "4001 1st Ave NE Redmond, WA 98052",
            },
          },
          WorkPhones: {
            type: "array",
            items: {
              type: "phoneNumber",
              description: "Work phone number",
              example: "+1 (987) 213-5674",
            },
          },
          MobilePhones: {
            type: "array",
            items: {
              type: "phoneNumber",
              description: "Mobile phone number",
              example: "+1 (987) 123-4567",
            },
          },
          Faxes: {
            type: "array",
            items: {
              type: "phoneNumber",
              description: "Fax number",
              example: "+1 (987) 312-6745",
            },
          },
          OtherPhones: {
            type: "array",
            items: {
              type: "phoneNumber",
              description: "Other phone number",
              example: "+1 (987) 213-5673",
            },
          },
          Emails: {
            type: "array",
            items: {
              type: "string",
              description: "Contact email",
              example: "chris.smith@contoso.com",
            },
          },
          Websites: {
            type: "array",
            items: {
              type: "string",
              description: "Website",
              example: "https://www.contoso.com",
            },
          },
        },
      },
    },
  };
}

module.exports = {
  PrebuiltBusinessCardModel,
  PrebuiltBusinessCardResult,
  PrebuiltBusinessCardDocument,
  BusinessCard,
  BusinessCardFields,
  BusinessCardContactNamesElement,
};
