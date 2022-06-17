// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The schema of the prebuilt-tax.us.w2 model.
 */
export const modelInfo = {
  modelId: "prebuilt-tax.us.w2",
  description:
    "Prebuilt model to extract key information from IRS US W2 tax forms (year 2018-2021)",
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
