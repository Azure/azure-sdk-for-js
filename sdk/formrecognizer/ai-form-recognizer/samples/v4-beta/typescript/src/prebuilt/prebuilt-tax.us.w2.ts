// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-tax.us.w2
// Description: Extract key information from IRS US W2 tax forms (year 2018-2021).
// API Version: 2022-06-30-preview
// Created:     Thu Jul 14 2022

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from IRS US W2 tax forms (year 2018-2021).
 */
export const PrebuiltTaxUsW2Model = fr.createModelFromSchema(
  modelInfo()
) as fr.DocumentModel<PrebuiltTaxUsW2Result>;

export interface PrebuiltTaxUsW2Result extends fr.AnalyzeResultCommon {
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
  documents: PrebuiltTaxUsW2Document[];
}

export type PrebuiltTaxUsW2Document = TaxUsW2;

export interface TaxUsW2 {
  /**
   * Document type: "tax.us.w2".
   */
  docType: "tax.us.w2";
  /**
   * Document fields.
   */
  fields: TaxUsW2Fields;
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
 * Describes the fields of `TaxUsW2Fields`.
 */
export interface TaxUsW2Fields {
  /**
   * `TaxUsW2` "W2FormVariant" field
   */
  w2FormVariant?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "TaxYear" field
   */
  taxYear?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "W2Copy" field
   */
  w2Copy?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Employee" field
   */
  employee?: fr.DocumentObjectField<TaxUsW2Employee>;
  /**
   * `TaxUsW2` "ControlNumber" field
   */
  controlNumber?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Employer" field
   */
  employer?: fr.DocumentObjectField<TaxUsW2Employer>;
  /**
   * `TaxUsW2` "WagesTipsAndOtherCompensation" field
   */
  wagesTipsAndOtherCompensation?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "FederalIncomeTaxWithheld" field
   */
  federalIncomeTaxWithheld?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "SocialSecurityWages" field
   */
  socialSecurityWages?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "SocialSecurityTaxWithheld" field
   */
  socialSecurityTaxWithheld?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "MedicareWagesAndTips" field
   */
  medicareWagesAndTips?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "MedicareTaxWithheld" field
   */
  medicareTaxWithheld?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "SocialSecurityTips" field
   */
  socialSecurityTips?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "AllocatedTips" field
   */
  allocatedTips?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "VerificationCode" field
   */
  verificationCode?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "DependentCareBenefits" field
   */
  dependentCareBenefits?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "NonQualifiedPlans" field
   */
  nonQualifiedPlans?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "AdditionalInfo" field
   */
  additionalInfo?: fr.DocumentArrayField<fr.DocumentObjectField<TaxUsW2AdditionalInfoElement>>;
  /**
   * `TaxUsW2` "IsStatutoryEmployee" field
   */
  isStatutoryEmployee?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "IsRetirementPlan" field
   */
  isRetirementPlan?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "IsThirdPartySickPay" field
   */
  isThirdPartySickPay?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Other" field
   */
  other?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "StateTaxInfos" field
   */
  stateTaxInfos?: fr.DocumentArrayField<fr.DocumentObjectField<TaxUsW2StateTaxInfosElement>>;
  /**
   * `TaxUsW2` "LocalTaxInfos" field
   */
  localTaxInfos?: fr.DocumentArrayField<fr.DocumentObjectField<TaxUsW2LocalTaxInfosElement>>;
}

/**
 * Describes the fields of `TaxUsW2Employee`.
 */
export interface TaxUsW2Employee {
  /**
   * `TaxUsW2` "SocialSecurityNumber" field
   */
  socialSecurityNumber?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Name" field
   */
  name?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Address" field
   */
  address?: fr.DocumentAddressField;
}

/**
 * Describes the fields of `TaxUsW2Employer`.
 */
export interface TaxUsW2Employer {
  /**
   * `TaxUsW2` "IdNumber" field
   */
  idNumber?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Name" field
   */
  name?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Address" field
   */
  address?: fr.DocumentAddressField;
}

/**
 * Describes the fields of `TaxUsW2AdditionalInfoElement`.
 */
export interface TaxUsW2AdditionalInfoElement {
  /**
   * `TaxUsW2` "LetterCode" field
   */
  letterCode?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Amount" field
   */
  amount?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `TaxUsW2StateTaxInfosElement`.
 */
export interface TaxUsW2StateTaxInfosElement {
  /**
   * `TaxUsW2` "State" field
   */
  state?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "EmployerStateIdNumber" field
   */
  employerStateIdNumber?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "StateWagesTipsEtc " field
   */
  stateWagesTipsEtc?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "StateIncomeTax " field
   */
  stateIncomeTax?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `TaxUsW2LocalTaxInfosElement`.
 */
export interface TaxUsW2LocalTaxInfosElement {
  /**
   * `TaxUsW2` "LocalWagesTipsEtc" field
   */
  localWagesTipsEtc?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "LocalIncomeTax" field
   */
  localIncomeTax?: fr.DocumentNumberField;
  /**
   * `TaxUsW2` "LocalityName" field
   */
  localityName?: fr.DocumentStringField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-tax.us.w2",
    description: "Extract key information from IRS US W2 tax forms (year 2018-2021).",
    createdDateTime: "2022-06-30T00:00:00.000Z",
    apiVersion: "2022-06-30-preview",
    docTypes: {
      "tax.us.w2": {
        buildMode: "template",
        fieldSchema: {
          W2FormVariant: {
            type: "string",
          },
          TaxYear: {
            type: "string",
          },
          W2Copy: {
            type: "string",
          },
          Employee: {
            type: "object",
            properties: {
              SocialSecurityNumber: {
                type: "string",
              },
              Name: {
                type: "string",
              },
              Address: {
                type: "address",
              },
            },
          },
          ControlNumber: {
            type: "string",
          },
          Employer: {
            type: "object",
            properties: {
              IdNumber: {
                type: "string",
              },
              Name: {
                type: "string",
              },
              Address: {
                type: "address",
              },
            },
          },
          WagesTipsAndOtherCompensation: {
            type: "number",
          },
          FederalIncomeTaxWithheld: {
            type: "number",
          },
          SocialSecurityWages: {
            type: "number",
          },
          SocialSecurityTaxWithheld: {
            type: "number",
          },
          MedicareWagesAndTips: {
            type: "number",
          },
          MedicareTaxWithheld: {
            type: "number",
          },
          SocialSecurityTips: {
            type: "number",
          },
          AllocatedTips: {
            type: "number",
          },
          VerificationCode: {
            type: "string",
          },
          DependentCareBenefits: {
            type: "number",
          },
          NonQualifiedPlans: {
            type: "number",
          },
          AdditionalInfo: {
            type: "array",
            items: {
              type: "object",
              properties: {
                LetterCode: {
                  type: "string",
                },
                Amount: {
                  type: "number",
                },
              },
            },
          },
          IsStatutoryEmployee: {
            type: "string",
          },
          IsRetirementPlan: {
            type: "string",
          },
          IsThirdPartySickPay: {
            type: "string",
          },
          Other: {
            type: "string",
          },
          StateTaxInfos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                State: {
                  type: "string",
                },
                EmployerStateIdNumber: {
                  type: "string",
                },
                "StateWagesTipsEtc ": {
                  type: "number",
                },
                "StateIncomeTax ": {
                  type: "number",
                },
              },
            },
          },
          LocalTaxInfos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                LocalWagesTipsEtc: {
                  type: "number",
                },
                LocalIncomeTax: {
                  type: "number",
                },
                LocalityName: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  } as const;
}
