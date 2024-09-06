// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Model:       prebuilt-idDocument
// Description: Extract key information from passports and ID cards.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from passports and ID cards.
 */
export const PrebuiltIdDocumentModel = fr.createModelFromSchema(
  modelInfo()
) as fr.DocumentModel<PrebuiltIdDocumentResult>;

export interface PrebuiltIdDocumentResult extends fr.AnalyzeResultCommon {
  /**
   * Extracted pages.
   */
  pages?: fr.DocumentPage[];
  /**
   * Extracted document paragraphs.
   */
  paragraphs?: fr.DocumentParagraph[];
  /**
   * Extracted font styles.
   */
  styles?: fr.DocumentStyle[];
  /**
   * Extracted key-value pairs.
   */
  keyValuePairs?: fr.DocumentKeyValuePair[];
  /**
   * Extracted documents.
   */
  documents: PrebuiltIdDocumentDocument[];
}

export type PrebuiltIdDocumentDocument =
  | IdDocumentDriverLicense
  | IdDocumentPassport
  | IdDocumentNationalIdentityCard
  | IdDocumentResidencePermit
  | IdDocumentUsSocialSecurityCard
  | IdDocument;

export interface IdDocumentDriverLicense {
  /**
   * Document type: "idDocument.driverLicense".
   */
  docType: "idDocument.driverLicense";
  /**
   * Document fields.
   */
  fields: IdDocumentDriverLicenseFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface IdDocumentPassport {
  /**
   * Document type: "idDocument.passport".
   */
  docType: "idDocument.passport";
  /**
   * Document fields.
   */
  fields: IdDocumentPassportFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface IdDocumentNationalIdentityCard {
  /**
   * Document type: "idDocument.nationalIdentityCard".
   */
  docType: "idDocument.nationalIdentityCard";
  /**
   * Document fields.
   */
  fields: IdDocumentNationalIdentityCardFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface IdDocumentResidencePermit {
  /**
   * Document type: "idDocument.residencePermit".
   */
  docType: "idDocument.residencePermit";
  /**
   * Document fields.
   */
  fields: IdDocumentResidencePermitFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface IdDocumentUsSocialSecurityCard {
  /**
   * Document type: "idDocument.usSocialSecurityCard".
   */
  docType: "idDocument.usSocialSecurityCard";
  /**
   * Document fields.
   */
  fields: IdDocumentUsSocialSecurityCardFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface IdDocument {
  /**
   * Document type: "idDocument".
   */
  docType: "idDocument";
  /**
   * Document fields.
   */
  fields: IdDocumentFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

/**
 * Describes the fields of `IdDocumentDriverLicenseFields`.
 */
export interface IdDocumentDriverLicenseFields {
  /**
   * Country or region code
   */
  countryRegion?: fr.DocumentCountryRegionField;
  /**
   * State or province
   */
  region?: fr.DocumentStringField;
  /**
   * Driver license number
   */
  documentNumber?: fr.DocumentStringField;
  /**
   * Driver license document discriminator
   */
  documentDiscriminator?: fr.DocumentStringField;
  /**
   * Given name and middle initial if applicable
   */
  firstName?: fr.DocumentStringField;
  /**
   * Surname
   */
  lastName?: fr.DocumentStringField;
  /**
   * Address
   */
  address?: fr.DocumentAddressField;
  /**
   * Date of birth
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * Date of expiration
   */
  dateOfExpiration?: fr.DocumentDateField;
  /**
   * Date of issue
   */
  dateOfIssue?: fr.DocumentDateField;
  /**
   * Eye color
   */
  eyeColor?: fr.DocumentStringField;
  /**
   * Hair color
   */
  hairColor?: fr.DocumentStringField;
  /**
   * Height
   */
  height?: fr.DocumentStringField;
  /**
   * Weight
   */
  weight?: fr.DocumentStringField;
  /**
   * Sex
   */
  sex?: fr.DocumentStringField;
  /**
   * Endorsements
   */
  endorsements?: fr.DocumentStringField;
  /**
   * Restrictions
   */
  restrictions?: fr.DocumentStringField;
  /**
   * Vehicle classification
   */
  vehicleClassifications?: fr.DocumentStringField;
}

/**
 * Describes the fields of `IdDocumentPassportFields`.
 */
export interface IdDocumentPassportFields {
  /**
   * Passport number
   */
  documentNumber?: fr.DocumentStringField;
  /**
   * Given name and middle initial if applicable
   */
  firstName?: fr.DocumentStringField;
  /**
   * Name between given name and surname
   */
  middleName?: fr.DocumentStringField;
  /**
   * Surname
   */
  lastName?: fr.DocumentStringField;
  /**
   * `IdDocumentPassport` "Aliases" field
   */
  aliases?: fr.DocumentArrayField<fr.DocumentStringField>;
  /**
   * Date of birth
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * Date of expiration
   */
  dateOfExpiration?: fr.DocumentDateField;
  /**
   * Date of issue
   */
  dateOfIssue?: fr.DocumentDateField;
  /**
   * Sex
   */
  sex?: fr.DocumentStringField;
  /**
   * Issuing country or organization
   */
  countryRegion?: fr.DocumentCountryRegionField;
  /**
   * Document type
   */
  documentType?: fr.DocumentStringField;
  /**
   * Nationality
   */
  nationality?: fr.DocumentCountryRegionField;
  /**
   * Place of birth
   */
  placeOfBirth?: fr.DocumentStringField;
  /**
   * Place of issue
   */
  placeOfIssue?: fr.DocumentStringField;
  /**
   * Issuing authority
   */
  issuingAuthority?: fr.DocumentStringField;
  /**
   * Personal Id. No.
   */
  personalNumber?: fr.DocumentStringField;
  /**
   * Machine readable zone (MRZ)
   */
  machineReadableZone?: fr.DocumentObjectField<IdDocumentPassportMachineReadableZone>;
}

/**
 * Describes the fields of `IdDocumentPassportMachineReadableZone`.
 *
 * Machine readable zone (MRZ)
 */
export interface IdDocumentPassportMachineReadableZone {
  /**
   * Given name and middle initial if applicable
   */
  firstName?: fr.DocumentStringField;
  /**
   * Surname
   */
  lastName?: fr.DocumentStringField;
  /**
   * Passport number
   */
  documentNumber?: fr.DocumentStringField;
  /**
   * Issuing country or organization
   */
  countryRegion?: fr.DocumentCountryRegionField;
  /**
   * Nationality
   */
  nationality?: fr.DocumentCountryRegionField;
  /**
   * Date of birth
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * Date of expiration
   */
  dateOfExpiration?: fr.DocumentDateField;
  /**
   * Sex
   */
  sex?: fr.DocumentStringField;
}

/**
 * Describes the fields of `IdDocumentNationalIdentityCardFields`.
 */
export interface IdDocumentNationalIdentityCardFields {
  /**
   * Country or region code
   */
  countryRegion?: fr.DocumentCountryRegionField;
  /**
   * State or province
   */
  region?: fr.DocumentStringField;
  /**
   * National identity card number
   */
  documentNumber?: fr.DocumentStringField;
  /**
   * National identity card document discriminator
   */
  documentDiscriminator?: fr.DocumentStringField;
  /**
   * Given name and middle initial if applicable
   */
  firstName?: fr.DocumentStringField;
  /**
   * Surname
   */
  lastName?: fr.DocumentStringField;
  /**
   * Address
   */
  address?: fr.DocumentAddressField;
  /**
   * Date of birth
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * Date of expiration
   */
  dateOfExpiration?: fr.DocumentDateField;
  /**
   * Date of issue
   */
  dateOfIssue?: fr.DocumentDateField;
  /**
   * Eye color
   */
  eyeColor?: fr.DocumentStringField;
  /**
   * Hair color
   */
  hairColor?: fr.DocumentStringField;
  /**
   * Height
   */
  height?: fr.DocumentStringField;
  /**
   * Weight
   */
  weight?: fr.DocumentStringField;
  /**
   * Sex
   */
  sex?: fr.DocumentStringField;
}

/**
 * Describes the fields of `IdDocumentResidencePermitFields`.
 */
export interface IdDocumentResidencePermitFields {
  /**
   * Country or region code
   */
  countryRegion?: fr.DocumentCountryRegionField;
  /**
   * Residence permit number
   */
  documentNumber?: fr.DocumentStringField;
  /**
   * Given name and middle initial if applicable
   */
  firstName?: fr.DocumentStringField;
  /**
   * Surname
   */
  lastName?: fr.DocumentStringField;
  /**
   * Date of birth
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * Date of expiration
   */
  dateOfExpiration?: fr.DocumentDateField;
  /**
   * Date of issue
   */
  dateOfIssue?: fr.DocumentDateField;
  /**
   * Sex
   */
  sex?: fr.DocumentStringField;
  /**
   * Place of birth
   */
  placeOfBirth?: fr.DocumentStringField;
  /**
   * Permit category
   */
  category?: fr.DocumentStringField;
}

/**
 * Describes the fields of `IdDocumentUsSocialSecurityCardFields`.
 */
export interface IdDocumentUsSocialSecurityCardFields {
  /**
   * Social security card number
   */
  documentNumber?: fr.DocumentStringField;
  /**
   * Given name and middle initial if applicable
   */
  firstName?: fr.DocumentStringField;
  /**
   * Surname
   */
  lastName?: fr.DocumentStringField;
  /**
   * Date of issue
   */
  dateOfIssue?: fr.DocumentDateField;
}

/**
 * Describes the fields of `IdDocumentFields`.
 */
export interface IdDocumentFields {
  /**
   * Address
   */
  address?: fr.DocumentAddressField;
  /**
   * Driver license number
   */
  documentNumber?: fr.DocumentStringField;
  /**
   * Given name and middle initial if applicable
   */
  firstName?: fr.DocumentStringField;
  /**
   * Surname
   */
  lastName?: fr.DocumentStringField;
  /**
   * Date of birth
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * Date of expiration
   */
  dateOfExpiration?: fr.DocumentDateField;
}

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
  } as const;
}
