// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The schema of the prebuilt-healthInsuranceCard.us model.
 */
export const modelInfo = {
  modelId: "prebuilt-healthInsuranceCard.us",
  description: "Prebuilt model to extract key information from US Health Insurance cards.",
  createdDateTime: "2022-03-30T00:00:00.000Z",
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
                description: "Dependent name",
              },
              IdNumberSuffix: {
                type: "string",
                description: "Dependent Membership Identification Suffix",
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
                description: "Co-Pay Benefit name",
              },
              Amount: {
                type: "string",
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
