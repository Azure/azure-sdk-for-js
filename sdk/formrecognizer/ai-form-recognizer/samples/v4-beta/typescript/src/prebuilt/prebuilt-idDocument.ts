// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-idDocument
// Description: Extract key information from US driver licenses and international passports.
// API Version: 2022-06-30-preview
// Created:     Thu Jul 14 2022

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from US driver licenses and international passports.
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

export type PrebuiltIdDocumentDocument = IdDocumentDriverLicense | IdDocumentPassport;

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

/**
 * Describes the fields of `IdDocumentDriverLicenseFields`.
 */
export interface IdDocumentDriverLicenseFields {
  /**
   * `IdDocumentDriverLicense` "CountryRegion" field
   */
  countryRegion?: fr.DocumentCountryRegionField;
  /**
   * `IdDocumentDriverLicense` "Region" field
   */
  region?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "DocumentNumber" field
   */
  documentNumber?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "DocumentDiscriminator" field
   */
  documentDiscriminator?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "FirstName" field
   */
  firstName?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "LastName" field
   */
  lastName?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "Address" field
   */
  address?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "DateOfBirth" field
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * `IdDocumentDriverLicense` "DateOfExpiration" field
   */
  dateOfExpiration?: fr.DocumentDateField;
  /**
   * `IdDocumentDriverLicense` "DateOfIssue" field
   */
  dateOfIssue?: fr.DocumentDateField;
  /**
   * `IdDocumentDriverLicense` "EyeColor" field
   */
  eyeColor?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "HairColor" field
   */
  hairColor?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "Height" field
   */
  height?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "Weight" field
   */
  weight?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "Sex" field
   */
  sex?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "Endorsements" field
   */
  endorsements?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "Restrictions" field
   */
  restrictions?: fr.DocumentStringField;
  /**
   * `IdDocumentDriverLicense` "VehicleClassifications" field
   */
  vehicleClassifications?: fr.DocumentStringField;
}

/**
 * Describes the fields of `IdDocumentPassportFields`.
 */
export interface IdDocumentPassportFields {
  /**
   * `IdDocumentPassport` "MachineReadableZone" field
   */
  machineReadableZone?: fr.DocumentObjectField<IdDocumentPassportMachineReadableZone>;
}

/**
 * Describes the fields of `IdDocumentPassportMachineReadableZone`.
 */
export interface IdDocumentPassportMachineReadableZone {
  /**
   * `IdDocumentPassport` "FirstName" field
   */
  firstName?: fr.DocumentStringField;
  /**
   * `IdDocumentPassport` "LastName" field
   */
  lastName?: fr.DocumentStringField;
  /**
   * `IdDocumentPassport` "DocumentNumber" field
   */
  documentNumber?: fr.DocumentStringField;
  /**
   * `IdDocumentPassport` "CountryRegion" field
   */
  countryRegion?: fr.DocumentCountryRegionField;
  /**
   * `IdDocumentPassport` "Nationality" field
   */
  nationality?: fr.DocumentCountryRegionField;
  /**
   * `IdDocumentPassport` "DateOfBirth" field
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * `IdDocumentPassport` "DateOfExpiration" field
   */
  dateOfExpiration?: fr.DocumentDateField;
  /**
   * `IdDocumentPassport` "Sex" field
   */
  sex?: fr.DocumentStringField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-idDocument",
    description: "Extract key information from US driver licenses and international passports.",
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
          DocumentDiscriminator: {
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
          DateOfIssue: {
            type: "date",
          },
          EyeColor: {
            type: "string",
          },
          HairColor: {
            type: "string",
          },
          Height: {
            type: "string",
          },
          Weight: {
            type: "string",
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
}
