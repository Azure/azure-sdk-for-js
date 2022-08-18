// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-businessCard
// Description: Extract key information from business cards.
// API Version: 2022-06-30-preview
// Created:     Thu Jul 14 2022

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from business cards.
 */
export const PrebuiltBusinessCardModel = fr.createModelFromSchema(
  modelInfo()
) as fr.DocumentModel<PrebuiltBusinessCardResult>;

export interface PrebuiltBusinessCardResult extends fr.AnalyzeResultCommon {
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
  documents: PrebuiltBusinessCardDocument[];
}

export type PrebuiltBusinessCardDocument = BusinessCard;

export interface BusinessCard {
  /**
   * Document type: "businessCard".
   */
  docType: "businessCard";
  /**
   * Document fields.
   */
  fields: BusinessCardFields;
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
 * Describes the fields of `BusinessCardFields`.
 */
export interface BusinessCardFields {
  /**
   * `BusinessCard` "ContactNames" field
   */
  contactNames?: fr.DocumentArrayField<fr.DocumentObjectField<BusinessCardContactNamesElement>>;
  /**
   * `BusinessCard` "CompanyNames" field
   */
  companyNames?: fr.DocumentArrayField<fr.DocumentStringField>;
  /**
   * `BusinessCard` "JobTitles" field
   */
  jobTitles?: fr.DocumentArrayField<fr.DocumentStringField>;
  /**
   * `BusinessCard` "Departments" field
   */
  departments?: fr.DocumentArrayField<fr.DocumentStringField>;
  /**
   * `BusinessCard` "Addresses" field
   */
  addresses?: fr.DocumentArrayField<fr.DocumentStringField>;
  /**
   * `BusinessCard` "WorkPhones" field
   */
  workPhones?: fr.DocumentArrayField<fr.DocumentPhoneNumberField>;
  /**
   * `BusinessCard` "MobilePhones" field
   */
  mobilePhones?: fr.DocumentArrayField<fr.DocumentPhoneNumberField>;
  /**
   * `BusinessCard` "Faxes" field
   */
  faxes?: fr.DocumentArrayField<fr.DocumentPhoneNumberField>;
  /**
   * `BusinessCard` "OtherPhones" field
   */
  otherPhones?: fr.DocumentArrayField<fr.DocumentPhoneNumberField>;
  /**
   * `BusinessCard` "Emails" field
   */
  emails?: fr.DocumentArrayField<fr.DocumentStringField>;
  /**
   * `BusinessCard` "Websites" field
   */
  websites?: fr.DocumentArrayField<fr.DocumentStringField>;
}

/**
 * Describes the fields of `BusinessCardContactNamesElement`.
 */
export interface BusinessCardContactNamesElement {
  /**
   * `BusinessCard` "FirstName" field
   */
  firstName?: fr.DocumentStringField;
  /**
   * `BusinessCard` "LastName" field
   */
  lastName?: fr.DocumentStringField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-businessCard",
    description: "Extract key information from business cards.",
    createdDateTime: "2022-06-30T00:00:00.000Z",
    apiVersion: "2022-06-30-preview",
    docTypes: {
      businessCard: {
        buildMode: "template",
        fieldSchema: {
          ContactNames: {
            type: "array",
            items: {
              type: "object",
              properties: {
                FirstName: {
                  type: "string",
                },
                LastName: {
                  type: "string",
                },
              },
            },
          },
          CompanyNames: {
            type: "array",
            items: {
              type: "string",
            },
          },
          JobTitles: {
            type: "array",
            items: {
              type: "string",
            },
          },
          Departments: {
            type: "array",
            items: {
              type: "string",
            },
          },
          Addresses: {
            type: "array",
            items: {
              type: "string",
            },
          },
          WorkPhones: {
            type: "array",
            items: {
              type: "phoneNumber",
            },
          },
          MobilePhones: {
            type: "array",
            items: {
              type: "phoneNumber",
            },
          },
          Faxes: {
            type: "array",
            items: {
              type: "phoneNumber",
            },
          },
          OtherPhones: {
            type: "array",
            items: {
              type: "phoneNumber",
            },
          },
          Emails: {
            type: "array",
            items: {
              type: "string",
            },
          },
          Websites: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  } as const;
}
