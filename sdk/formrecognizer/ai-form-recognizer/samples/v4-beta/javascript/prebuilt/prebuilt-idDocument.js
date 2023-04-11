// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-idDocument
// Description: Extract key information from passports and ID cards.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract key information from passports and ID cards.
 */
const PrebuiltIdDocumentModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-idDocument",
    description: "Extract key information from passports and ID cards.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
    docTypes: {
      "idDocument.driverLicense": {
        buildMode: "template",
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
          DocumentDiscriminator: {
            type: "string",
            description: "Driver license document discriminator",
            example: "12645646464554646456464544",
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
            type: "address",
            description: "Address",
            example: "123 STREET ADDRESS YOUR CITY WA 99999-1234",
          },
          DateOfBirth: {
            type: "date",
            description: "Date of birth",
            example: "01/06/1958",
          },
          DateOfExpiration: {
            type: "date",
            description: "Date of expiration",
            example: "08/12/2020",
          },
          DateOfIssue: {
            type: "date",
            description: "Date of issue",
            example: "08/12/2012",
          },
          EyeColor: {
            type: "string",
            description: "Eye color",
            example: "BLU",
          },
          HairColor: {
            type: "string",
            description: "Hair color",
            example: "BRO",
          },
          Height: {
            type: "string",
            description: "Height",
            example: "5'11\"",
          },
          Weight: {
            type: "string",
            description: "Weight",
            example: "185LB",
          },
          Sex: {
            type: "string",
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
        buildMode: "template",
        fieldSchema: {
          DocumentNumber: {
            type: "string",
            description: "Passport number",
            example: "340020013",
          },
          FirstName: {
            type: "string",
            description: "Given name and middle initial if applicable",
            example: "JENNIFER",
          },
          MiddleName: {
            type: "string",
            description: "Name between given name and surname",
            example: "REYES",
          },
          LastName: {
            type: "string",
            description: "Surname",
            example: "BROOKS",
          },
          Aliases: {
            type: "array",
            items: {
              type: "string",
              description: "Also known as",
              example: "MAY LIN",
            },
          },
          DateOfBirth: {
            type: "date",
            description: "Date of birth",
            example: "1980-01-01",
          },
          DateOfExpiration: {
            type: "date",
            description: "Date of expiration",
            example: "2019-05-05",
          },
          DateOfIssue: {
            type: "date",
            description: "Date of issue",
            example: "2014-05-06",
          },
          Sex: {
            type: "string",
            description: "Sex",
            example: "F",
          },
          CountryRegion: {
            type: "countryRegion",
            description: "Issuing country or organization",
            example: "USA",
          },
          DocumentType: {
            type: "string",
            description: "Document type",
            example: "P",
          },
          Nationality: {
            type: "countryRegion",
            description: "Nationality",
            example: "USA",
          },
          PlaceOfBirth: {
            type: "string",
            description: "Place of birth",
            example: "MASSACHUSETTS, U.S.A.",
          },
          PlaceOfIssue: {
            type: "string",
            description: "Place of issue",
            example: "LA PAZ",
          },
          IssuingAuthority: {
            type: "string",
            description: "Issuing authority",
            example: "United States Department of State",
          },
          PersonalNumber: {
            type: "string",
            description: "Personal Id. No.",
            example: "A234567893",
          },
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
                example: "2019-05-05",
              },
              Sex: {
                type: "string",
                description: "Sex",
                example: "F",
              },
            },
          },
        },
      },
      "idDocument.nationalIdentityCard": {
        buildMode: "template",
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
            description: "National identity card number",
            example: "WDLABCD456DG",
          },
          DocumentDiscriminator: {
            type: "string",
            description: "National identity card document discriminator",
            example: "12645646464554646456464544",
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
            type: "address",
            description: "Address",
            example: "123 STREET ADDRESS YOUR CITY WA 99999-1234",
          },
          DateOfBirth: {
            type: "date",
            description: "Date of birth",
            example: "01/06/1958",
          },
          DateOfExpiration: {
            type: "date",
            description: "Date of expiration",
            example: "08/12/2020",
          },
          DateOfIssue: {
            type: "date",
            description: "Date of issue",
            example: "08/12/2012",
          },
          EyeColor: {
            type: "string",
            description: "Eye color",
            example: "BLU",
          },
          HairColor: {
            type: "string",
            description: "Hair color",
            example: "BRO",
          },
          Height: {
            type: "string",
            description: "Height",
            example: "5'11\"",
          },
          Weight: {
            type: "string",
            description: "Weight",
            example: "185LB",
          },
          Sex: {
            type: "string",
            description: "Sex",
            example: "M",
          },
        },
      },
      "idDocument.residencePermit": {
        buildMode: "template",
        fieldSchema: {
          CountryRegion: {
            type: "countryRegion",
            description: "Country or region code",
            example: "USA",
          },
          DocumentNumber: {
            type: "string",
            description: "Residence permit number",
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
          DateOfBirth: {
            type: "date",
            description: "Date of birth",
            example: "01/06/1958",
          },
          DateOfExpiration: {
            type: "date",
            description: "Date of expiration",
            example: "08/12/2020",
          },
          DateOfIssue: {
            type: "date",
            description: "Date of issue",
            example: "08/12/2012",
          },
          Sex: {
            type: "string",
            description: "Sex",
            example: "M",
          },
          PlaceOfBirth: {
            type: "string",
            description: "Place of birth",
            example: "Germany",
          },
          Category: {
            type: "string",
            description: "Permit category",
            example: "DV2",
          },
        },
      },
      "idDocument.usSocialSecurityCard": {
        buildMode: "template",
        fieldSchema: {
          DocumentNumber: {
            type: "string",
            description: "Social security card number",
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
          DateOfIssue: {
            type: "date",
            description: "Date of issue",
            example: "08/12/2012",
          },
        },
      },
      idDocument: {
        buildMode: "template",
        fieldSchema: {
          Address: {
            type: "address",
            description: "Address",
            example: "123 STREET ADDRESS YOUR CITY WA 99999-1234",
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
          DateOfBirth: {
            type: "date",
            description: "Date of birth",
            example: "01/06/1958",
          },
          DateOfExpiration: {
            type: "date",
            description: "Date of expiration",
            example: "08/12/2020",
          },
        },
      },
    },
  };
}

module.exports = {
  PrebuiltIdDocumentModel,
  PrebuiltIdDocumentResult,
  PrebuiltIdDocumentDocument,
  IdDocumentDriverLicense,
  IdDocumentPassport,
  IdDocumentNationalIdentityCard,
  IdDocumentResidencePermit,
  IdDocumentUsSocialSecurityCard,
  IdDocument,
  IdDocumentDriverLicenseFields,
  IdDocumentPassportFields,
  IdDocumentPassportMachineReadableZone,
  IdDocumentNationalIdentityCardFields,
  IdDocumentResidencePermitFields,
  IdDocumentUsSocialSecurityCardFields,
  IdDocumentFields,
};
