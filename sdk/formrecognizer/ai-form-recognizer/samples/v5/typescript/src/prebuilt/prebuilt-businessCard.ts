// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Model:       prebuilt-businessCard
// Description: Extract key information from business cards.
// API Version: 2023-07-31
// Created:     Wed Aug 02 2023

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
  addresses?: fr.DocumentArrayField<fr.DocumentAddressField>;
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
   * First (given) name of contact
   */
  firstName?: fr.DocumentStringField;
  /**
   * Last (family) name of contact
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
    createdOn: "2023-07-31T00:00:00.000Z",
    apiVersion: "2023-07-31",
    docTypes: {
      businessCard: {
        buildMode: "template",
        fieldSchema: {
          ContactNames: {
            type: "array",
            items: {
              type: "object",
              description: "Contact name",
              example: "Chris Smith",
              properties: {
                FirstName: {
                  type: "string",
                  description: "First (given) name of contact",
                  example: "Chris",
                },
                LastName: {
                  type: "string",
                  description: "Last (family) name of contact",
                  example: "Smith",
                },
              },
            },
          },
          CompanyNames: {
            type: "array",
            items: {
              type: "string",
              description: "Company name",
              example: "CONTOSO",
            },
          },
          JobTitles: {
            type: "array",
            items: {
              type: "string",
              description: "Job title",
              example: "Senior Researcher",
            },
          },
          Departments: {
            type: "array",
            items: {
              type: "string",
              description: "Department or organization",
              example: "Cloud & AI Department",
            },
          },
          Addresses: {
            type: "array",
            items: {
              type: "address",
              description: "Address",
              example: "4001 1st Ave NE Redmond, WA 98052",
            },
          },
          WorkPhones: {
            type: "array",
            items: {
              type: "phoneNumber",
              description: "Work phone number",
              example: "+1 (987) 213-5674",
            },
          },
          MobilePhones: {
            type: "array",
            items: {
              type: "phoneNumber",
              description: "Mobile phone number",
              example: "+1 (987) 123-4567",
            },
          },
          Faxes: {
            type: "array",
            items: {
              type: "phoneNumber",
              description: "Fax number",
              example: "+1 (987) 312-6745",
            },
          },
          OtherPhones: {
            type: "array",
            items: {
              type: "phoneNumber",
              description: "Other phone number",
              example: "+1 (987) 213-5673",
            },
          },
          Emails: {
            type: "array",
            items: {
              type: "string",
              description: "Contact email",
              example: "chris.smith@contoso.com",
            },
          },
          Websites: {
            type: "array",
            items: {
              type: "string",
              description: "Website",
              example: "https://www.contoso.com",
            },
          },
        },
      },
    },
  } as const;
}
