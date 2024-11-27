// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Model:       prebuilt-healthInsuranceCard.us
// Description: Extract key information from US health insurance cards.
// API Version: 2023-07-31
// Created:     Tue Aug 01 2023

import * as fr from "../../../src";

/**
 * Extract key information from US health insurance cards.
 */
export const PrebuiltHealthInsuranceCardUsModel = fr.createModelFromSchema(
  modelInfo(),
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
  /**
   * `HealthInsuranceCardUs` "MedicareMedicaidInfo" field
   */
  medicareMedicaidInfo?: fr.DocumentObjectField<HealthInsuranceCardUsMedicareMedicaidInfo>;
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
   * Plan name - If see Medicaid -\> then medicaid
   */
  name?: fr.DocumentStringField;
  /**
   * Plan type
   */
  type?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsMedicareMedicaidInfo`.
 */
export interface HealthInsuranceCardUsMedicareMedicaidInfo {
  /**
   * Medicare or Medicaid number
   */
  id?: fr.DocumentStringField;
  /**
   * Effective date of Medicare Part A
   */
  partAEffectiveDate?: fr.DocumentDateField;
  /**
   * Effective date of Medicare Part B
   */
  partBEffectiveDate?: fr.DocumentDateField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-healthInsuranceCard.us",
    description: "Extract key information from US health insurance cards.",
    createdOn: "2023-07-31T00:00:00.000Z",
    apiVersion: "2023-07-31",
    docTypes: {
      "healthInsuranceCard.us": {
        buildMode: "template",
        fieldSchema: {
          Insurer: {
            type: "string",
            description: "Health insurance provider name",
            example: "PREMERA\nBLUE CROSS",
          },
          Member: {
            type: "object",
            properties: {
              Name: {
                type: "string",
                description: "Member name",
                example: "ANGEL BROWN",
              },
              BirthDate: {
                type: "date",
                description: "Member date of birth",
                example: "01/06/1958",
              },
              Employer: {
                type: "string",
                description: "Member name employer",
                example: "Microsoft",
              },
              Gender: {
                type: "string",
                description: "Member gender",
                example: "M",
              },
              IdNumberSuffix: {
                type: "string",
                description:
                  "Identification Number Suffix as it appears on some health insurance cards",
                example: "01",
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
                  example: "01",
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
                example: "ABC",
              },
              Number: {
                type: "string",
                description: "Identification Number",
                example: "123456789",
              },
            },
          },
          GroupNumber: {
            type: "string",
            description: "Insurance Group Number",
            example: "1000000",
          },
          PrescriptionInfo: {
            type: "object",
            properties: {
              Issuer: {
                type: "string",
                description: "ANSI issuer identification number (IIN)",
                example: "(80840) 300-11908-77",
              },
              RxBIN: {
                type: "string",
                description: "Prescription issued BIN number",
                example: "987654",
              },
              RxPCN: {
                type: "string",
                description: "Prescription processor control number",
                example: "63200305",
              },
              RxGrp: {
                type: "string",
                description: "Prescription group number",
                example: "BCAAXYZ",
              },
              RxId: {
                type: "string",
                description:
                  "Prescription identification number. If not present, will default to membership id number",
                example: "P97020065",
              },
              RxPlan: {
                type: "string",
                description: "Prescription Plan number",
                example: "A1",
              },
            },
          },
          Pbm: {
            type: "string",
            description: "Pharmacy Benefit Manager for the plan",
            example: "CVS CAREMARK",
          },
          EffectiveDate: {
            type: "date",
            description: "Date from which the plan is effective",
            example: "08/12/2012",
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
                  example: "Deductible",
                },
                Amount: {
                  type: "currency",
                  description: "Co-Pay required amount",
                  example: "$1,500",
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
                example: "89063",
              },
              Address: {
                type: "address",
                description: "Payer address",
                example: "123 Service St, Redmond WA, 98052",
              },
              PhoneNumber: {
                type: "phoneNumber",
                description: "Payer phone number",
                example: "+1 (987) 213-5674",
              },
            },
          },
          Plan: {
            type: "object",
            properties: {
              Number: {
                type: "string",
                description: "Plan number",
                example: "456",
              },
              Name: {
                type: "string",
                description: "Plan name - If see Medicaid -> then medicaid",
                example: "HEALTH SAVINGS PLAN",
              },
              Type: {
                type: "string",
                description: "Plan type",
                example: "PPO",
              },
            },
          },
          MedicareMedicaidInfo: {
            type: "object",
            properties: {
              Id: {
                type: "string",
                description: "Medicare or Medicaid number",
                example: "1AB2-CD3-EF45",
              },
              PartAEffectiveDate: {
                type: "date",
                description: "Effective date of Medicare Part A",
                example: "01-01-2023",
              },
              PartBEffectiveDate: {
                type: "date",
                description: "Effective date of Medicare Part B",
                example: "01-01-2023",
              },
            },
          },
        },
      },
    },
  } as const;
}
