// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The schema of the prebuilt-vaccinationCard model.
 */
export const modelInfo = {
  modelId: "prebuilt-vaccinationCard",
  description:
    "Prebuilt model to extract key information from the US CDC Covid-19 vaccination cards.",
  createdDateTime: "2022-03-30T00:00:00.000Z",
  apiVersion: "2022-06-30-preview",
  docTypes: {
    "vaccinationCard.covid.us": {
      buildMode: "template",
      fieldSchema: {
        CardHolderInfo: {
          type: "object",
          properties: {
            FirstName: {
              type: "string",
            },
            LastNames: {
              type: "string",
            },
            DateOfBirth: {
              type: "date",
            },
            PatientNumber: {
              type: "string",
            },
          },
        },
        Vaccines: {
          type: "array",
          items: {
            type: "object",
            properties: {
              Manufacturer: {
                type: "string",
              },
              DateAdministered: {
                type: "date",
              },
            },
          },
        },
      },
    },
  },
} as const;
