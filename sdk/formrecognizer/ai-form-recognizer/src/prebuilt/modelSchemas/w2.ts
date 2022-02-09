// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";

/**
 * The type of a document extracted using the prebuilt United States W2 tax document model (`PrebuiltModels.TaxUsW2`).
 */
export type TaxUsW2 = ReifyPrebuiltSchema<typeof TaxUsW2Schema>;

/**
 * The schema of the prebuilt United States W2 tax document model.
 * @hidden
 */
export const TaxUsW2Schema = {
  modelId: "prebuilt-tax.us.w2",
  description:
    "Prebuilt model to extract key information from IRS US W2 tax forms (year 2018-2021)",
  createdDateTime: "2022-01-30T00:00:00Z",
  apiVersion: "2022-01-30-preview",
  docTypes: {
    "tax.us.w2": {
      description: "IRS US W2 tax form",
      fieldSchema: {
        W2FormVariant: {
          description:
            "IRS W2 Form variant. This field can have the one of the following values: 'W-2', 'W-2AS', 'W-2CM', 'W-2GU' or 'W-2VI'",
          type: "string",
          example: "W-2",
        },
        TaxYear: {
          description: "Form tax year.",
          type: "string",
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
              description:
                "Employee social security number. IRS W2 form field a. eg: '123-45-6789'.",
              type: "string",
              example: "123-45-6789",
            },
            Name: {
              type: "string",
              description:
                "Employee's first name, middle full/initials name, last name and suffix. IRS W2 form field e.",
              example: "John Contonso",
            },
            Address: {
              type: "string",
              description: "Employee's address. Part of IRS W2 form field f.",
              example: "123 Microsoft way, Redmond WA",
            },
            ZipCode: {
              description: "Employee's zipcode. Part of IRS W2 form field f.",
              type: "string",
              example: "98052",
            },
          },
        },
        ControlNumber: {
          description: "W2 Form control number. IRS W2 form field d.",
          type: "string",
          example: "0AB12 D345 7890",
        },
        Employer: {
          type: "object",
          properties: {
            IdNumber: {
              description: "Employer's identification number. IRS W2 form field b",
              type: "string",
              example: "12-3456789",
            },
            Name: {
              type: "string",
              description: "Employer's name. Part of IRS W2 form field c.",
              example: "Fabrikam",
            },
            Address: {
              type: "string",
              description: "Employer's address. Part of IRS W2 form field c.",
              example: "321 Microsoft way, Redmond WA",
            },
            ZipCode: {
              description: "Employer's zipcode. Part of IRS W2 form field c.",
              type: "string",
              example: "98052",
            },
          },
        },
        WagesTipsAndOtherCompensation: {
          description: "Wages, tips, and other compensation amount in USD. IRS W2 form field 1.",
          type: "number",
          example: "1234567.89",
        },
        FederalIncomeTaxWithheld: {
          description: "Federal income tax withheld amount in USD. IRS W2 form field 2.",
          type: "number",
          example: "1234567.89",
        },
        SocialSecurityWages: {
          description: "Social security wages amount in USD. IRS W2 form field 3.",
          type: "number",
          example: "1234567.89",
        },
        SocialSecurityTaxWithheld: {
          description: "Social security tax withheld amount in USD. IRS W2 form field 4.",
          type: "number",
          example: "1234567.89",
        },
        MedicareWagesAndTips: {
          description: "Medicare wages and tips amount in USD. IRS W2 form field 5.",
          type: "number",
          example: "1234567.89",
        },
        MedicareTaxWithheld: {
          description: "Medicare tax withheld amount in USD. IRS W2 form field 6.",
          type: "number",
          example: "1234567.89",
        },
        SocialSecurityTips: {
          description: "Social security tips amount in USD. IRS W2 form field 7.",
          type: "number",
          example: "1234567.89",
        },
        AllocatedTips: {
          description: "Allocated tips in USD. IRS W2 form field 8.",
          type: "number",
          example: "1234567.89",
        },
        VerificationCode: {
          description: "W2 form verification code. IRS W2 form field 9.",
          type: "string",
          example: "AB123456",
        },
        DependentCareBenefits: {
          description: "Dependent care benefits amount in USD. IRS W2 form field 10.",
          type: "number",
          example: "1234567.89",
        },
        NonQualifiedPlans: {
          description: "Non-qualified plans amount in USD. IRS W2 form field 11.",
          type: "number",
          example: "1234567.89",
        },
        AdditionalInfo: {
          type: "array",
          description: "Array holding W2 Codes. IRS W2 form field 12.",
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
          description: "Part of IRS W2 form field 13. Can be 'true' or 'false'.",
          example: "true",
        },
        IsRetirementPlan: {
          type: "string",
          description: "Part of IRS W2 form field 13. Can be 'true' or 'false'.",
          example: "true",
        },
        IsThirdPartySickPay: {
          type: "string",
          description: "Part of IRS W2 form field 13. Can be 'true' or 'false'.",
          example: "true",
        },
        Other: {
          type: "string",
          description: "Content of IRS W2 form field 14.",
          example: "SICK LV WAGES SBJT TO $511/DAY LIMIT 1356",
        },
        StateTaxInfos: {
          type: "array",
          description: "State tax-related information. content of IRS W2 form field 15 to 17.",
          items: {
            type: "object",
            properties: {
              State: {
                type: "string",
                description: "Two letter state code. Part of IRS W2 form field 15.",
                example: "WA",
              },
              EmployerStateIdNumber: {
                type: "string",
                description: "Employer state ID number. Part of IRS W2 form field 15.",
                example: "1234567",
              },
              "StateWagesTipsEtc ": {
                type: "number",
                description: "State wages, tips, etc amount in USD. IRS W2 form field 16.",
                example: "1234567.89",
              },
              "StateIncomeTax ": {
                type: "number",
                description: "State income tax amount in USD. IRS W2 form field 17.",
                example: "1234567.89",
              },
            },
          },
        },
        LocalTaxInfos: {
          type: "array",
          description: "Local tax-related information. Content of IRS W2 form field 18 to 20.",
          items: {
            type: "object",
            properties: {
              LocalWagesTipsEtc: {
                type: "number",
                description: "Local wages, tips, etc amount in USD. Part of IRS W2 form field 18.",
                example: "1234567.89",
              },
              LocalIncomeTax: {
                type: "number",
                description: "Local income tax amount in USD. Part of IRS W2 form field 19.",
                example: "1234567.89",
              },
              LocalityName: {
                type: "string",
                description: "Locality name. Part of IRS W2 form field 20.",
                example: "Redmond",
              },
            },
          },
        },
      },
    },
  },
} as const;
