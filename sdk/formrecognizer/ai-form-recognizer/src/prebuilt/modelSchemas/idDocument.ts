// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";

/**
 * The type of a document extracted using the prebuilt identity document model (`PrebuiltModels.IdentityDocument`).
 */
export type IdentityDocument = ReifyPrebuiltSchema<typeof IdentityDocumentSchema>;

/**
 * The schema of the prebuilt identity document model.
 * @hidden
 */
export const IdentityDocumentSchema = {
  modelId: "prebuilt-idDocument",
  description:
    "Prebuilt model to extract key information from US driver licenses and international passports.",
  createdDateTime: "2021-07-30T00:00:00Z",
  docTypes: {
    "idDocument.driverLicense": {
      description: "Driver License - Currently, only US driver licenses are supported.",
      fieldSchema: {
        CountryRegion: {
          type: "countryRegion",
          description: "Country or region code",
          example: "USA",
        },
        Region: {
          type: "string",
          description: "State or province",
          example: "Washington",
        },
        DocumentNumber: {
          type: "string",
          description: "Driver license number",
          example: "WDLABCD456DG",
        },
        FirstName: {
          type: "string",
          description: "Given name and middle initial if applicable",
          example: "LIAM R.",
        },
        LastName: {
          type: "string",
          description: "Surname",
          example: "TALBOT",
        },
        Address: {
          type: "string",
          description: "Address",
          example: "123 STREET ADDRESS YOUR CITY WA 99999-1234",
        },
        DateOfBirth: {
          type: "date",
          description: "Date of birth (DOB)",
          example: "01/06/1958",
        },
        DateOfExpiration: {
          type: "date",
          description: "Date of expiration (EXP)",
          example: "08/12/2020",
        },
        Sex: {
          type: "string",
          enum: ["M", "F", "X"],
          description: "Sex",
          example: "M",
        },
        Endorsements: {
          type: "string",
          description: "Endorsements",
          example: "L",
        },
        Restrictions: {
          type: "string",
          description: "Restrictions",
          example: "B",
        },
        VehicleClassifications: {
          type: "string",
          description: "Vehicle classification",
          example: "D",
        },
      },
    },
    "idDocument.passport": {
      description: "Passport",
      fieldSchema: {
        MachineReadableZone: {
          type: "object",
          description: "Machine readable zone (MRZ)",
          example:
            "P<USABROOKS<<JENNIFER<<<<<<<<<<<<<<<<<<<<<<< 3400200135USA8001014F1905054710000307<715816",
          properties: {
            FirstName: {
              type: "string",
              description: "Given name and middle initial if applicable",
              example: "JENNIFER",
            },
            LastName: {
              type: "string",
              description: "Surname",
              example: "BROOKS",
            },
            DocumentNumber: {
              type: "string",
              description: "Passport number",
              example: "340020013",
            },
            CountryRegion: {
              type: "countryRegion",
              description: "Issuing country or organization",
              example: "USA",
            },
            Nationality: {
              type: "countryRegion",
              description: "Nationality",
              example: "USA",
            },
            DateOfBirth: {
              type: "date",
              description: "Date of birth",
              example: "1980-01-01",
            },
            DateOfExpiration: {
              type: "date",
              description: "Date of expiration",
              example: "201-05-05",
            },
            Sex: {
              type: "string",
              enum: ["M", "F", "X"],
              description: "Sex",
              example: "F",
            },
          },
        },
      },
    },
  },
} as const;
