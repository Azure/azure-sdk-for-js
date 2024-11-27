// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Model:       prebuilt-vaccinationCard
// Description: Extract key information from US Covid-19 CDC vaccination cards.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

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
   * Array holding all the Covid-19 shots received by the cardholder
   */
  vaccines?: fr.DocumentArrayField<fr.DocumentObjectField<VaccinationCovid19UsVaccinesElement>>;
}

/**
 * Describes the fields of `VaccinationCovid19UsCardHolderInfo`.
 */
export interface VaccinationCovid19UsCardHolderInfo {
  /**
   * Cardholder first name
   */
  firstName?: fr.DocumentStringField;
  /**
   * Cardholder last name
   */
  lastNames?: fr.DocumentStringField;
  /**
   * Cardholder date of birth
   */
  dateOfBirth?: fr.DocumentDateField;
  /**
   * Cardholder Patient number if present
   */
  patientNumber?: fr.DocumentStringField;
}

/**
 * Describes the fields of `VaccinationCovid19UsVaccinesElement`.
 *
 * Array holding all the Covid-19 shots received by the cardholder
 */
export interface VaccinationCovid19UsVaccinesElement {
  /**
   * Manifacturer of the vaccine dose
   */
  manufacturer?: fr.DocumentStringField;
  /**
   * Date at which the dose was administrated
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
  } as const;
}
