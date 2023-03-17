// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-vaccinationCard
// Description: Extract key information from US Covid-19 CDC vaccination cards.
// API Version: 2022-06-30-preview
// Created:     Thu Jul 14 2022

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from US Covid-19 CDC vaccination cards.
 */
export const PrebuiltVaccinationCardModel = fr.createModelFromSchema(
  modelInfo()
) as fr.DocumentModel<PrebuiltVaccinationCardResult>;

export interface PrebuiltVaccinationCardResult extends fr.AnalyzeResultCommon {
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
  documents: PrebuiltVaccinationCardDocument[];
}

export type PrebuiltVaccinationCardDocument = VaccinationCovid19Us;

export interface VaccinationCovid19Us {
  /**
   * Document type: "vaccinationCard.covid19.us".
   */
  docType: "vaccinationCard.covid19.us";
  /**
   * Document fields.
   */
  fields: VaccinationCovid19UsFields;
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
 * Describes the fields of `VaccinationCovid19UsFields`.
 */
export interface VaccinationCovid19UsFields {
  /**
   * `VaccinationCovid19Us` "CardHolderInfo" field
   */
  cardHolderInfo?: fr.DocumentObjectField<VaccinationCovid19UsCardHolderInfo>;
  /**
   * `VaccinationCovid19Us` "Vaccines" field
   */
  vaccines?: fr.DocumentArrayField<fr.DocumentObjectField<VaccinationCovid19UsVaccinesElement>>;
}

/**
 * Describes the fields of `VaccinationCovid19UsCardHolderInfo`.
 */
export interface VaccinationCovid19UsCardHolderInfo {
  /**
   * `VaccinationCovid19Us` "FirstName" field
   */
  firstName?: fr.DocumentStringField;
  /**
   * `VaccinationCovid19Us` "LastNames" field
   */
  lastNames?: fr.DocumentStringField;
  /**
   * `VaccinationCovid19Us` "DateOfBirth" field
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * `VaccinationCovid19Us` "PatientNumber" field
   */
  patientNumber?: fr.DocumentStringField;
}

/**
 * Describes the fields of `VaccinationCovid19UsVaccinesElement`.
 */
export interface VaccinationCovid19UsVaccinesElement {
  /**
   * `VaccinationCovid19Us` "Manufacturer" field
   */
  manufacturer?: fr.DocumentStringField;
  /**
   * `VaccinationCovid19Us` "DateAdministered" field
   */
  dateAdministered?: fr.DocumentDateField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-vaccinationCard",
    description: "Extract key information from US Covid-19 CDC vaccination cards.",
    createdDateTime: "2022-06-30T00:00:00.000Z",
    apiVersion: "2022-06-30-preview",
    docTypes: {
      "vaccinationCard.covid19.us": {
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
}
