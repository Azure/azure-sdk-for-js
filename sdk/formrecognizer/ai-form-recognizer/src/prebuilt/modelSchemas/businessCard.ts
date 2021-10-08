// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";

/**
 * The type of a document extracted using the prebuilt business card model (`PrebuiltModels.BusinessCard`).
 */
export type BusinessCard = ReifyPrebuiltSchema<typeof BusinessCardSchema>;

/**
 * The schema of the prebuilt business card model.
 * @hidden
 */
export const BusinessCardSchema = {
  modelId: "prebuilt-businessCard",
  description:
    "Prebuilt model to extract key information from English business cards, including personal contact info, company name, job title, and more.",
  createdDateTime: "2021-07-30T00:00:00Z",
  docTypes: {
    "prebuilt:businesscard": {
      description: "Business Card",
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
            example: "Cloud & Al Department",
          },
        },
        Addresses: {
          type: "array",
          items: {
            type: "string",
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
