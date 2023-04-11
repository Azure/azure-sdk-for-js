// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-vaccinationCard
// Description: Extract key information from US Covid-19 CDC vaccination cards.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract key information from US Covid-19 CDC vaccination cards.
 */
const PrebuiltVaccinationCardModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-vaccinationCard",
    description: "Extract key information from US Covid-19 CDC vaccination cards.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
    docTypes: {
      "vaccinationCard.covid19.us": {
        buildMode: "template",
        fieldSchema: {
          CardHolderInfo: {
            type: "object",
            properties: {
              FirstName: {
                type: "string",
                description: "Cardholder first name",
                example: "John",
              },
              LastNames: {
                type: "string",
                description: "Cardholder last name",
                example: "Contoso",
              },
              DateOfBirth: {
                type: "date",
                description: "Cardholder date of birth",
                example: "12/25/1980",
              },
              PatientNumber: {
                type: "string",
                description: "Cardholder Patient number if present",
                example: "AB123456789",
              },
            },
          },
          Vaccines: {
            type: "array",
            description: "Array holding all the Covid-19 shots received by the cardholder",
            items: {
              type: "object",
              properties: {
                Manufacturer: {
                  type: "string",
                  description: "Manifacturer of the vaccine dose",
                  example: "Pfizer Covid-19 vaccine",
                },
                DateAdministered: {
                  type: "date",
                  description: "Date at which the dose was administrated",
                  example: "12/25/2022",
                },
              },
            },
          },
        },
      },
    },
  };
}

module.exports = {
  PrebuiltVaccinationCardModel,
  PrebuiltVaccinationCardResult,
  PrebuiltVaccinationCardDocument,
  VaccinationCovid19Us,
  VaccinationCovid19UsFields,
  VaccinationCovid19UsCardHolderInfo,
  VaccinationCovid19UsVaccinesElement,
};
