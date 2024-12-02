// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Model:       prebuilt-tax.us.w2
// Description: Extract key information from IRS US W2 tax forms (year 2018-current).
// API Version: 2023-07-31
// Created:     Tue Aug 01 2023

import * as fr from "../../../src";

/**
 * Extract key information from IRS US W2 tax forms (year 2018-current).
 */
export const PrebuiltTaxUsW2Model = fr.createModelFromSchema(
  modelInfo(),
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
   * IRS W2 Form variant. This field can have the one of the following values: 'W-2', 'W-2AS', 'W-2CM', 'W-2GU' or 'W-2VI'
   */
  w2FormVariant?: fr.DocumentStringField;
  /**
   * Form tax year
   */
  taxYear?: fr.DocumentStringField;
  /**
   * W2 form copy version along with printed instruction realted to this copy
   */
  w2Copy?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Employee" field
   */
  employee?: fr.DocumentObjectField<TaxUsW2Employee>;
  /**
   * W2 Form control number. IRS W2 form field d
   */
  controlNumber?: fr.DocumentStringField;
  /**
   * `TaxUsW2` "Employer" field
   */
  employer?: fr.DocumentObjectField<TaxUsW2Employer>;
  /**
   * Wages, tips, and other compensation amount in USD. IRS W2 form field 1
   */
  wagesTipsAndOtherCompensation?: fr.DocumentNumberField;
  /**
   * Federal income tax withheld amount in USD. IRS W2 form field 2
   */
  federalIncomeTaxWithheld?: fr.DocumentNumberField;
  /**
   * Social security wages amount in USD. IRS W2 form field 3
   */
  socialSecurityWages?: fr.DocumentNumberField;
  /**
   * Social security tax withheld amount in USD. IRS W2 form field 4
   */
  socialSecurityTaxWithheld?: fr.DocumentNumberField;
  /**
   * Medicare wages and tips amount in USD. IRS W2 form field 5
   */
  medicareWagesAndTips?: fr.DocumentNumberField;
  /**
   * Medicare tax withheld amount in USD. IRS W2 form field 6
   */
  medicareTaxWithheld?: fr.DocumentNumberField;
  /**
   * Social security tips amount in USD. IRS W2 form field 7
   */
  socialSecurityTips?: fr.DocumentNumberField;
  /**
   * Allocated tips in USD. IRS W2 form field 8
   */
  allocatedTips?: fr.DocumentNumberField;
  /**
   * W2 form verification code. IRS W2 form field 9
   */
  verificationCode?: fr.DocumentStringField;
  /**
   * Dependent care benefits amount in USD. IRS W2 form field 10
   */
  dependentCareBenefits?: fr.DocumentNumberField;
  /**
   * Non-qualified plans amount in USD. IRS W2 form field 11
   */
  nonQualifiedPlans?: fr.DocumentNumberField;
  /**
   * Array holding W2 Codes. IRS W2 form field 12
   */
  additionalInfo?: fr.DocumentArrayField<fr.DocumentObjectField<TaxUsW2AdditionalInfoElement>>;
  /**
   * Part of IRS W2 form field 13. Can be 'true' or 'false'
   */
  isStatutoryEmployee?: fr.DocumentStringField;
  /**
   * Part of IRS W2 form field 13. Can be 'true' or 'false'
   */
  isRetirementPlan?: fr.DocumentStringField;
  /**
   * Part of IRS W2 form field 13. Can be 'true' or 'false'
   */
  isThirdPartySickPay?: fr.DocumentStringField;
  /**
   * Content of IRS W2 form field 14
   */
  other?: fr.DocumentStringField;
  /**
   * State tax-related information. content of IRS W2 form field 15 to 17
   */
  stateTaxInfos?: fr.DocumentArrayField<fr.DocumentObjectField<TaxUsW2StateTaxInfosElement>>;
  /**
   * Local tax-related information. Content of IRS W2 form field 18 to 20
   */
  localTaxInfos?: fr.DocumentArrayField<fr.DocumentObjectField<TaxUsW2LocalTaxInfosElement>>;
}

/**
 * Describes the fields of `TaxUsW2Employee`.
 */
export interface TaxUsW2Employee {
  /**
   * Employee social security number. IRS W2 form field a. eg: '123-45-6789'
   */
  socialSecurityNumber?: fr.DocumentStringField;
  /**
   * Employee's first name, middle full/initials name, last name and suffix. IRS W2 form field e
   */
  name?: fr.DocumentStringField;
  /**
   * Employee's address. Part of IRS W2 form field f
   */
  address?: fr.DocumentAddressField;
}

/**
 * Describes the fields of `TaxUsW2Employer`.
 */
export interface TaxUsW2Employer {
  /**
   * Employer's identification number. IRS W2 form field b
   */
  idNumber?: fr.DocumentStringField;
  /**
   * Employer's name. Part of IRS W2 form field c
   */
  name?: fr.DocumentStringField;
  /**
   * Employer's address. Part of IRS W2 form field c
   */
  address?: fr.DocumentAddressField;
}

/**
 * Describes the fields of `TaxUsW2AdditionalInfoElement`.
 *
 * Array holding W2 Codes. IRS W2 form field 12
 */
export interface TaxUsW2AdditionalInfoElement {
  /**
   * Please refer to https://www.irs.gov/pub/irs-pdf/iw2w3.pdf for more details on IRS W2 box 12's letter code
   */
  letterCode?: fr.DocumentStringField;
  /**
   * Code amount in USD
   */
  amount?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `TaxUsW2StateTaxInfosElement`.
 *
 * State tax-related information. content of IRS W2 form field 15 to 17
 */
export interface TaxUsW2StateTaxInfosElement {
  /**
   * Two letter state code. Part of IRS W2 form field 15
   */
  state?: fr.DocumentStringField;
  /**
   * Employer state ID number. Part of IRS W2 form field 15
   */
  employerStateIdNumber?: fr.DocumentStringField;
  /**
   * State wages, tips, etc amount in USD. IRS W2 form field 16
   */
  stateWagesTipsEtc?: fr.DocumentNumberField;
  /**
   * State income tax amount in USD. IRS W2 form field 17
   */
  stateIncomeTax?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `TaxUsW2LocalTaxInfosElement`.
 *
 * Local tax-related information. Content of IRS W2 form field 18 to 20
 */
export interface TaxUsW2LocalTaxInfosElement {
  /**
   * Local wages, tips, etc amount in USD. Part of IRS W2 form field 18
   */
  localWagesTipsEtc?: fr.DocumentNumberField;
  /**
   * Local income tax amount in USD. Part of IRS W2 form field 19
   */
  localIncomeTax?: fr.DocumentNumberField;
  /**
   * Locality name. Part of IRS W2 form field 20
   */
  localityName?: fr.DocumentStringField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-tax.us.w2",
    description: "Extract key information from IRS US W2 tax forms (year 2018-current).",
    createdOn: "2023-07-31T00:00:00.000Z",
    apiVersion: "2023-07-31",
    docTypes: {
      "tax.us.w2": {
        buildMode: "template",
        fieldSchema: {
          W2FormVariant: {
            type: "string",
            description:
              "IRS W2 Form variant. This field can have the one of the following values: 'W-2', 'W-2AS', 'W-2CM', 'W-2GU' or 'W-2VI'",
            example: "W-2",
          },
          TaxYear: {
            type: "string",
            description: "Form tax year",
            example: "2021",
          },
          W2Copy: {
            type: "string",
            description: "W2 form copy version along with printed instruction realted to this copy",
            example: "Copy A—For Social Security Administration",
          },
          Employee: {
            type: "object",
            properties: {
              SocialSecurityNumber: {
                type: "string",
                description:
                  "Employee social security number. IRS W2 form field a. eg: '123-45-6789'",
                example: "123-45-6789",
              },
              Name: {
                type: "string",
                description:
                  "Employee's first name, middle full/initials name, last name and suffix. IRS W2 form field e",
                example: "John Contonso",
              },
              Address: {
                type: "address",
                description: "Employee's address. Part of IRS W2 form field f",
                example: "123 Microsoft way, Redmond WA, 98123",
              },
            },
          },
          ControlNumber: {
            type: "string",
            description: "W2 Form control number. IRS W2 form field d",
            example: "0AB12 D345 7890",
          },
          Employer: {
            type: "object",
            properties: {
              IdNumber: {
                type: "string",
                description: "Employer's identification number. IRS W2 form field b",
                example: "12-3456789",
              },
              Name: {
                type: "string",
                description: "Employer's name. Part of IRS W2 form field c",
                example: "Fabrikam",
              },
              Address: {
                type: "address",
                description: "Employer's address. Part of IRS W2 form field c",
                example: "321 Microsoft way, Redmond WA, 98123",
              },
            },
          },
          WagesTipsAndOtherCompensation: {
            type: "number",
            description: "Wages, tips, and other compensation amount in USD. IRS W2 form field 1",
            example: "1234567.89",
          },
          FederalIncomeTaxWithheld: {
            type: "number",
            description: "Federal income tax withheld amount in USD. IRS W2 form field 2",
            example: "1234567.89",
          },
          SocialSecurityWages: {
            type: "number",
            description: "Social security wages amount in USD. IRS W2 form field 3",
            example: "1234567.89",
          },
          SocialSecurityTaxWithheld: {
            type: "number",
            description: "Social security tax withheld amount in USD. IRS W2 form field 4",
            example: "1234567.89",
          },
          MedicareWagesAndTips: {
            type: "number",
            description: "Medicare wages and tips amount in USD. IRS W2 form field 5",
            example: "1234567.89",
          },
          MedicareTaxWithheld: {
            type: "number",
            description: "Medicare tax withheld amount in USD. IRS W2 form field 6",
            example: "1234567.89",
          },
          SocialSecurityTips: {
            type: "number",
            description: "Social security tips amount in USD. IRS W2 form field 7",
            example: "1234567.89",
          },
          AllocatedTips: {
            type: "number",
            description: "Allocated tips in USD. IRS W2 form field 8",
            example: "1234567.89",
          },
          VerificationCode: {
            type: "string",
            description: "W2 form verification code. IRS W2 form field 9",
            example: "AB123456",
          },
          DependentCareBenefits: {
            type: "number",
            description: "Dependent care benefits amount in USD. IRS W2 form field 10",
            example: "1234567.89",
          },
          NonQualifiedPlans: {
            type: "number",
            description: "Non-qualified plans amount in USD. IRS W2 form field 11",
            example: "1234567.89",
          },
          AdditionalInfo: {
            type: "array",
            description: "Array holding W2 Codes. IRS W2 form field 12",
            items: {
              type: "object",
              properties: {
                LetterCode: {
                  type: "string",
                  description:
                    "Please refer to https://www.irs.gov/pub/irs-pdf/iw2w3.pdf for more details on IRS W2 box 12's letter code",
                  example: "A",
                },
                Amount: {
                  type: "number",
                  description: "Code amount in USD",
                  example: "1234567.89",
                },
              },
            },
          },
          IsStatutoryEmployee: {
            type: "string",
            description: "Part of IRS W2 form field 13. Can be 'true' or 'false'",
            example: "true",
          },
          IsRetirementPlan: {
            type: "string",
            description: "Part of IRS W2 form field 13. Can be 'true' or 'false'",
            example: "true",
          },
          IsThirdPartySickPay: {
            type: "string",
            description: "Part of IRS W2 form field 13. Can be 'true' or 'false'",
            example: "true",
          },
          Other: {
            type: "string",
            description: "Content of IRS W2 form field 14",
            example: "SICK LV WAGES SBJT TO $511/DAY LIMIT 1356",
          },
          StateTaxInfos: {
            type: "array",
            description: "State tax-related information. content of IRS W2 form field 15 to 17",
            items: {
              type: "object",
              properties: {
                State: {
                  type: "string",
                  description: "Two letter state code. Part of IRS W2 form field 15",
                  example: "WA",
                },
                EmployerStateIdNumber: {
                  type: "string",
                  description: "Employer state ID number. Part of IRS W2 form field 15",
                  example: "1234567",
                },
                StateWagesTipsEtc: {
                  type: "number",
                  description: "State wages, tips, etc amount in USD. IRS W2 form field 16",
                  example: "1234567.89",
                },
                StateIncomeTax: {
                  type: "number",
                  description: "State income tax amount in USD. IRS W2 form field 17",
                  example: "1234567.89",
                },
              },
            },
          },
          LocalTaxInfos: {
            type: "array",
            description: "Local tax-related information. Content of IRS W2 form field 18 to 20",
            items: {
              type: "object",
              properties: {
                LocalWagesTipsEtc: {
                  type: "number",
                  description: "Local wages, tips, etc amount in USD. Part of IRS W2 form field 18",
                  example: "1234567.89",
                },
                LocalIncomeTax: {
                  type: "number",
                  description: "Local income tax amount in USD. Part of IRS W2 form field 19",
                  example: "1234567.89",
                },
                LocalityName: {
                  type: "string",
                  description: "Locality name. Part of IRS W2 form field 20",
                  example: "Redmond",
                },
              },
            },
          },
        },
      },
    },
  } as const;
}
