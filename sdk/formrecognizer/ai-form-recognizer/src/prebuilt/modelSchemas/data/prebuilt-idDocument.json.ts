// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The schema of the prebuilt-idDocument model.
 */
export const modelInfo = {
  modelId: "prebuilt-idDocument",
  description:
    "Prebuilt model to extract key information from US driver licenses and international passports.",
  createdDateTime: "2022-06-30T00:00:00.000Z",
  apiVersion: "2022-06-30-preview",
  docTypes: {
    "idDocument.driverLicense": {
      buildMode: "template",
      fieldSchema: {
        CountryRegion: {
          type: "countryRegion",
        },
        Region: {
          type: "string",
        },
        DocumentNumber: {
          type: "string",
        },
        FirstName: {
          type: "string",
        },
        LastName: {
          type: "string",
        },
        Address: {
          type: "string",
        },
        DateOfBirth: {
          type: "date",
        },
        DateOfExpiration: {
          type: "date",
        },
        Sex: {
          type: "string",
        },
        Endorsements: {
          type: "string",
        },
        Restrictions: {
          type: "string",
        },
        VehicleClassifications: {
          type: "string",
        },
      },
    },
    "idDocument.passport": {
      buildMode: "template",
      fieldSchema: {
        MachineReadableZone: {
          type: "object",
          properties: {
            FirstName: {
              type: "string",
            },
            LastName: {
              type: "string",
            },
            DocumentNumber: {
              type: "string",
            },
            CountryRegion: {
              type: "countryRegion",
            },
            Nationality: {
              type: "countryRegion",
            },
            DateOfBirth: {
              type: "date",
            },
            DateOfExpiration: {
              type: "date",
            },
            Sex: {
              type: "string",
            },
          },
        },
      },
    },
  },
} as const;
