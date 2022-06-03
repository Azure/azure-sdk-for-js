// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The schema of the prebuilt-businessCard model.
 */
export const modelInfo = {
  modelId: "prebuilt-businessCard",
  description:
    "Prebuilt model to extract key information from English business cards, including personal contact info, company name, job title, and more.",
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
