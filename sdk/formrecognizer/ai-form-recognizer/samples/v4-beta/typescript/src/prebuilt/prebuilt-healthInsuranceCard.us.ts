// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-healthInsuranceCard.us
// Description: Extract key information from US health insurance cards.
// API Version: 2022-06-30-preview
// Created:     Thu Jul 14 2022

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
   * `HealthInsuranceCardUs` "Insurer" field
   */
  insurer?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "Member" field
   */
  member?: fr.DocumentObjectField<HealthInsuranceCardUsMember>;
  /**
   * `HealthInsuranceCardUs` "Dependents" field
   */
  dependents?: fr.DocumentArrayField<
    fr.DocumentObjectField<HealthInsuranceCardUsDependentsElement>
  >;
  /**
   * `HealthInsuranceCardUs` "IdNumber" field
   */
  idNumber?: fr.DocumentObjectField<HealthInsuranceCardUsIdNumber>;
  /**
   * `HealthInsuranceCardUs` "GroupNumber" field
   */
  groupNumber?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "PrescriptionInfo" field
   */
  prescriptionInfo?: fr.DocumentObjectField<HealthInsuranceCardUsPrescriptionInfo>;
  /**
   * `HealthInsuranceCardUs` "Pbm" field
   */
  pbm?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "EffectiveDate" field
   */
  effectiveDate?: fr.DocumentDateField;
  /**
   * `HealthInsuranceCardUs` "Copays" field
   */
  copays?: fr.DocumentArrayField<fr.DocumentObjectField<HealthInsuranceCardUsCopaysElement>>;
  /**
   * `HealthInsuranceCardUs` "Payer" field
   */
  payer?: fr.DocumentObjectField<HealthInsuranceCardUsPayer>;
  /**
   * `HealthInsuranceCardUs` "MedicareMedicaidInfo" field
   */
  medicareMedicaidInfo?: fr.DocumentObjectField<HealthInsuranceCardUsMedicareMedicaidInfo>;
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
   * `HealthInsuranceCardUs` "Name" field
   */
  name?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "DateOfBirth" field
   */
  dateOfBirth?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "Employer" field
   */
  employer?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "Gender" field
   */
  gender?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "IdNumberSuffix" field
   */
  idNumberSuffix?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsDependentsElement`.
 */
export interface HealthInsuranceCardUsDependentsElement {
  /**
   * `HealthInsuranceCardUs` "Name" field
   */
  name?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "IdNumberSuffix" field
   */
  idNumberSuffix?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsIdNumber`.
 */
export interface HealthInsuranceCardUsIdNumber {
  /**
   * `HealthInsuranceCardUs` "Prefix" field
   */
  prefix?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "Number" field
   */
  number?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsPrescriptionInfo`.
 */
export interface HealthInsuranceCardUsPrescriptionInfo {
  /**
   * `HealthInsuranceCardUs` "IssuerId" field
   */
  issuerId?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "RxBIN" field
   */
  rxBIN?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "RxPCN" field
   */
  rxPCN?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "RxGrp" field
   */
  rxGrp?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "RxId" field
   */
  rxId?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "RxPlan" field
   */
  rxPlan?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsCopaysElement`.
 */
export interface HealthInsuranceCardUsCopaysElement {
  /**
   * `HealthInsuranceCardUs` "Benefit" field
   */
  benefit?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "Amount" field
   */
  amount?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsPayer`.
 */
export interface HealthInsuranceCardUsPayer {
  /**
   * `HealthInsuranceCardUs` "Id" field
   */
  id?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "Address" field
   */
  address?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "PhoneNumber" field
   */
  phoneNumber?: fr.DocumentPhoneNumberField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsMedicareMedicaidInfo`.
 */
export interface HealthInsuranceCardUsMedicareMedicaidInfo {
  /**
   * `HealthInsuranceCardUs` "PartAEffectiveDate" field
   */
  partAEffectiveDate?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "PartBEffectiveDate" field
   */
  partBEffectiveDate?: fr.DocumentStringField;
}

/**
 * Describes the fields of `HealthInsuranceCardUsPlan`.
 */
export interface HealthInsuranceCardUsPlan {
  /**
   * `HealthInsuranceCardUs` "Number" field
   */
  number?: fr.DocumentStringField;
  /**
   * `HealthInsuranceCardUs` "Name" field
   */
  name?: fr.DocumentStringField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-healthInsuranceCard.us",
    description: "Extract key information from US health insurance cards.",
    createdDateTime: "2022-06-30T00:00:00.000Z",
    apiVersion: "2022-06-30-preview",
    docTypes: {
      "healthInsuranceCard.us": {
        buildMode: "template",
        fieldSchema: {
          Insurer: {
            type: "string",
          },
          Member: {
            type: "object",
            properties: {
              Name: {
                type: "string",
              },
              DateOfBirth: {
                type: "string",
              },
              Employer: {
                type: "string",
              },
              Gender: {
                type: "string",
              },
              IdNumberSuffix: {
                type: "string",
              },
            },
          },
          Dependents: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Name: {
                  type: "string",
                },
                IdNumberSuffix: {
                  type: "string",
                },
              },
            },
          },
          IdNumber: {
            type: "object",
            properties: {
              Prefix: {
                type: "string",
              },
              Number: {
                type: "string",
              },
            },
          },
          GroupNumber: {
            type: "string",
          },
          PrescriptionInfo: {
            type: "object",
            properties: {
              IssuerId: {
                type: "string",
              },
              RxBIN: {
                type: "string",
              },
              RxPCN: {
                type: "string",
              },
              RxGrp: {
                type: "string",
              },
              RxId: {
                type: "string",
              },
              RxPlan: {
                type: "string",
              },
            },
          },
          Pbm: {
            type: "string",
          },
          EffectiveDate: {
            type: "date",
          },
          Copays: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Benefit: {
                  type: "string",
                },
                Amount: {
                  type: "string",
                },
              },
            },
          },
          Payer: {
            type: "object",
            properties: {
              Id: {
                type: "string",
              },
              Address: {
                type: "string",
              },
              PhoneNumber: {
                type: "phoneNumber",
              },
            },
          },
          MedicareMedicaidInfo: {
            type: "object",
            properties: {
              PartAEffectiveDate: {
                type: "string",
              },
              PartBEffectiveDate: {
                type: "string",
              },
            },
          },
          Plan: {
            type: "object",
            properties: {
              Number: {
                type: "string",
              },
              Name: {
                type: "string",
              },
            },
          },
        },
      },
    },
  } as const;
}
