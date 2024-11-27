// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Model:       prebuilt-healthInsuranceCard.us
// Description: Extract key information from US health insurance cards.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from US health insurance cards.
 */
export const PrebuiltHealthInsuranceCardUsModel = fr.createModelFromSchema(
  modelInfo()
) as fr.DocumentModel<PrebuiltHealthInsuranceCardUsResult>;

export interface PrebuiltHealthInsuranceCardUsResult extends fr.AnalyzeResultCommon {
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
  documents: PrebuiltHealthInsuranceCardUsDocument[];
}

export type PrebuiltHealthInsuranceCardUsDocument = HealthInsuranceCardUs;

export interface HealthInsuranceCardUs {
  /**
   * Document type: "healthInsuranceCard.us".
   */
  docType: "healthInsuranceCard.us";
  /**
   * Document fields.
   */
  fields: HealthInsuranceCardUsFields;
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
 * Describes the fields of `HealthInsuranceCardUsFields`.
 */
export interface HealthInsuranceCardUsFields {
  /**
   * Health insurance provider name
   */
  insurer?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "Member" field
   */
  member?: fr.DocumentObjectField<HealthInsuranceCardUsMember>;
  /**
   * Array holding list of dependents, ordered where possible by membership suffix value
   */
  dependents?: fr.DocumentArrayField<
    fr.DocumentObjectField<HealthInsuranceCardUsDependentsElement>
  >;
  /**
   * `HealthInsuranceCardUs` "IdNumber" field
   */
  idNumber?: fr.DocumentObjectField<HealthInsuranceCardUsIdNumber>;
  /**
   * Insurance Group Number
   */
  groupNumber?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "PrescriptionInfo" field
   */
  prescriptionInfo?: fr.DocumentObjectField<HealthInsuranceCardUsPrescriptionInfo>;
  /**
   * Pharmacy Benefit Manager for the plan
   */
  pbm?: fr.DocumentStringField;
  /**
   * Date from which the plan is effective
   */
  effectiveDate?: fr.DocumentDateField;
  /**
   * Array holding list of CoPay Benefits
   */
  copays?: fr.DocumentArrayField<fr.DocumentObjectField<HealthInsuranceCardUsCopaysElement>>;
  /**
   * `HealthInsuranceCardUs` "Payer" field
   */
  payer?: fr.DocumentObjectField<HealthInsuranceCardUsPayer>;
  /**
   * `HealthInsuranceCardUs` "Plan" field
   */
  plan?: fr.DocumentObjectField<HealthInsuranceCardUsPlan>;
}

/**
 * Describes the fields of `HealthInsuranceCardUsMember`.
 */
export interface HealthInsuranceCardUsMember {
  /**
   * Member name
   */
  name?: fr.DocumentStringField;
  /**
   * Member date of birth
   */
  birthDate?: fr.DocumentDateField;
  /**
   * Member name employer
   */
  employer?: fr.DocumentStringField;
  /**
   * Member gender
   */
  gender?: fr.DocumentStringField;
  /**
   * Identification Number Suffix as it appears on some health insurance cards
   */
  idNumberSuffix?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsDependentsElement`.
 *
 * Array holding list of dependents, ordered where possible by membership suffix value
 */
export interface HealthInsuranceCardUsDependentsElement {
  /**
   * Dependent name
   */
  name?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsIdNumber`.
 */
export interface HealthInsuranceCardUsIdNumber {
  /**
   * Identification Number Prefix as it appears on some health insurance cards
   */
  prefix?: fr.DocumentStringField;
  /**
   * Identification Number
   */
  number?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsPrescriptionInfo`.
 */
export interface HealthInsuranceCardUsPrescriptionInfo {
  /**
   * ANSI issuer identification number (IIN)
   */
  issuer?: fr.DocumentStringField;
  /**
   * Prescription issued BIN number
   */
  rxBIN?: fr.DocumentStringField;
  /**
   * Prescription processor control number
   */
  rxPCN?: fr.DocumentStringField;
  /**
   * Prescription group number
   */
  rxGrp?: fr.DocumentStringField;
  /**
   * Prescription identification number. If not present, will default to membership id number
   */
  rxId?: fr.DocumentStringField;
  /**
   * Prescription Plan number
   */
  rxPlan?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsCopaysElement`.
 *
 * Array holding list of CoPay Benefits
 */
export interface HealthInsuranceCardUsCopaysElement {
  /**
   * Co-Pay Benefit name
   */
  benefit?: fr.DocumentStringField;
  /**
   * Co-Pay required amount
   */
  amount?: fr.DocumentCurrencyField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsPayer`.
 */
export interface HealthInsuranceCardUsPayer {
  /**
   * Payer Id Number
   */
  id?: fr.DocumentStringField;
  /**
   * Payer address
   */
  address?: fr.DocumentAddressField;
  /**
   * Payer phone number
   */
  phoneNumber?: fr.DocumentPhoneNumberField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsPlan`.
 */
export interface HealthInsuranceCardUsPlan {
  /**
   * Plan number
   */
  number?: fr.DocumentStringField;
  /**
   * Plan name - If see Medicaid -> then medicaid
   */
  name?: fr.DocumentStringField;
  /**
   * Plan type
   */
  type?: fr.DocumentStringField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-healthInsuranceCard.us",
    description: "Extract key information from US health insurance cards.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
    docTypes: {
      "healthInsuranceCard.us": {
        buildMode: "template",
        fieldSchema: {
          Insurer: {
            type: "string",
            description: "Health insurance provider name",
          },
          Member: {
            type: "object",
            properties: {
              Name: {
                type: "string",
                description: "Member name",
              },
              BirthDate: {
                type: "date",
                description: "Member date of birth",
              },
              Employer: {
                type: "string",
                description: "Member name employer",
              },
              Gender: {
                type: "string",
                description: "Member gender",
              },
              IdNumberSuffix: {
                type: "string",
                description:
                  "Identification Number Suffix as it appears on some health insurance cards",
              },
            },
          },
          Dependents: {
            type: "array",
            description:
              "Array holding list of dependents, ordered where possible by membership suffix value",
            items: {
              type: "object",
              properties: {
                Name: {
                  type: "string",
                  description: "Dependent name",
                },
              },
            },
          },
          IdNumber: {
            type: "object",
            properties: {
              Prefix: {
                type: "string",
                description:
                  "Identification Number Prefix as it appears on some health insurance cards",
              },
              Number: {
                type: "string",
                description: "Identification Number",
              },
            },
          },
          GroupNumber: {
            type: "string",
            description: "Insurance Group Number",
          },
          PrescriptionInfo: {
            type: "object",
            properties: {
              Issuer: {
                type: "string",
                description: "ANSI issuer identification number (IIN)",
              },
              RxBIN: {
                type: "string",
                description: "Prescription issued BIN number",
              },
              RxPCN: {
                type: "string",
                description: "Prescription processor control number",
              },
              RxGrp: {
                type: "string",
                description: "Prescription group number",
              },
              RxId: {
                type: "string",
                description:
                  "Prescription identification number. If not present, will default to membership id number",
              },
              RxPlan: {
                type: "string",
                description: "Prescription Plan number",
              },
            },
          },
          Pbm: {
            type: "string",
            description: "Pharmacy Benefit Manager for the plan",
          },
          EffectiveDate: {
            type: "date",
            description: "Date from which the plan is effective",
          },
          Copays: {
            type: "array",
            description: "Array holding list of CoPay Benefits",
            items: {
              type: "object",
              properties: {
                Benefit: {
                  type: "string",
                  description: "Co-Pay Benefit name",
                },
                Amount: {
                  type: "currency",
                  description: "Co-Pay required amount",
                },
              },
            },
          },
          Payer: {
            type: "object",
            properties: {
              Id: {
                type: "string",
                description: "Payer Id Number",
              },
              Address: {
                type: "address",
                description: "Payer address",
              },
              PhoneNumber: {
                type: "phoneNumber",
                description: "Payer phone number",
              },
            },
          },
          Plan: {
            type: "object",
            properties: {
              Number: {
                type: "string",
                description: "Plan number",
              },
              Name: {
                type: "string",
                description: "Plan name - If see Medicaid -> then medicaid",
              },
              Type: {
                type: "string",
                description: "Plan type",
              },
            },
          },
        },
      },
    },
  } as const;
}
