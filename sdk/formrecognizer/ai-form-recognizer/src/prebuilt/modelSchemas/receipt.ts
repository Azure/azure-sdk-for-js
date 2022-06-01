// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";

/**
 * The type of a document extracted using the prebuilt receipt model (`PrebuiltModels.Receipt`).
 */
export type Receipt = ReifyPrebuiltSchema<typeof ReceiptSchema>;

/**
 * The schema of the prebuilt receipt model.
 * @hidden
 */
export const ReceiptSchema = {
  modelId: "prebuilt-receipt",
  description:
    "Prebuilt model to extract key information from English receipts, including merchant name, transaction date, transaction total, and more.",
  createdDateTime: "2022-01-30T00:00:00Z",
  apiVersion: "2022-01-30-preview",
  docTypes: {
    receipt: {
      description: "General receipt",
      fieldSchema: {
        Locale: {
          type: "string",
          enum: ["en-AU", "en-CA", "en-GB", "en-IN", "en-US"],
          description: "Locale",
          example: "en-US",
        },
        MerchantName: {
          type: "string",
          description: "Name of the merchant issuing the receipt",
          example: "Contoso",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
          description: "Listed phone number of merchant",
          example: "987-654-3210",
        },
        MerchantAddress: {
          type: "string",
          description: "Listed address of merchant",
          example: "123 Main St Redmond WA 98052",
        },
        Total: {
          type: "number",
          description: "Full transaction total of receipt",
          example: "$14.34",
        },
        TransactionDate: {
          type: "date",
          description: "Date the receipt was issued",
          example: "June 06, 2019",
        },
        TransactionTime: {
          type: "time",
          description: "Time the receipt was issued",
          example: "4:49 PM",
        },
        Subtotal: {
          type: "number",
          description: "Subtotal of receipt, often before taxes are applied",
          example: "$12.34",
        },
        Tax: {
          type: "number",
          description: "Tax on receipt, often sales tax or equivalent",
          example: "$2.00",
        },
        Tip: {
          type: "number",
          description: "Tip included by buyer",
          example: "$1.00",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            description: "Extracted line item",
            example: "1\nSurface Pro 6\n$999.00\n$999.00",
            properties: {
              TotalPrice: {
                type: "number",
                description: "Total price of line item",
                example: "$999.00",
              },
              Description: {
                type: "string",
                description: "Item description",
                example: "Surface Pro 6",
              },
              Quantity: {
                type: "number",
                description: "Quantity of each item",
                example: "1",
              },
              Price: {
                type: "number",
                description: "Individual price of each item unit",
                example: "$999.00",
              },
            },
          },
        },
      },
    },
    "receipt.retailMeal": {
      description: "Retail or meal receipt",
      fieldSchema: {
        Locale: {
          type: "string",
          enum: ["en-AU", "en-CA", "en-GB", "en-IN", "en-US"],
          description: "Locale",
          example: "en-US",
        },
        MerchantName: {
          type: "string",
          description: "Name of the merchant issuing the receipt",
          example: "Contoso",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
          description: "Listed phone number of merchant",
          example: "987-654-3210",
        },
        MerchantAddress: {
          type: "string",
          description: "Listed address of merchant",
          example: "123 Main St Redmond WA 98052",
        },
        Total: {
          type: "number",
          description: "Full transaction total of receipt",
          example: "$14.34",
        },
        TransactionDate: {
          type: "date",
          description: "Date the receipt was issued",
          example: "June 06, 2019",
        },
        TransactionTime: {
          type: "time",
          description: "Time the receipt was issued",
          example: "4:49 PM",
        },
        Subtotal: {
          type: "number",
          description: "Subtotal of receipt, often before taxes are applied",
          example: "$12.34",
        },
        Tax: {
          type: "number",
          description: "Tax on receipt, often sales tax or equivalent",
          example: "$2.00",
        },
        Tip: {
          type: "number",
          description: "Tip included by buyer",
          example: "$1.00",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            description: "Extracted line item",
            example: "1\nSurface Pro 6\n$999.00\n$999.00",
            properties: {
              TotalPrice: {
                type: "number",
                description: "Total price of line item",
                example: "$999.00",
              },
              Description: {
                type: "string",
                description: "Item description",
                example: "Surface Pro 6",
              },
              Quantity: {
                type: "number",
                description: "Quantity of each item",
                example: "1",
              },
              Price: {
                type: "number",
                description: "Individual price of each item unit",
                example: "$999.00",
              },
            },
          },
        },
      },
    },
    "receipt.creditCard": {
      description: "Sales credit receipt (credit slip)",
      fieldSchema: {
        Locale: {
          type: "string",
          enum: ["en-AU", "en-CA", "en-GB", "en-IN", "en-US"],
          description: "Locale",
          example: "en-US",
        },
        MerchantName: {
          type: "string",
          description: "Name of the merchant issuing the receipt",
          example: "Contoso",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
          description: "Listed phone number of merchant",
          example: "987-654-3210",
        },
        MerchantAddress: {
          type: "string",
          description: "Listed address of merchant",
          example: "123 Main St Redmond WA 98052",
        },
        Total: {
          type: "number",
          description: "Full transaction total of receipt",
          example: "$14.34",
        },
        TransactionDate: {
          type: "date",
          description: "Date the receipt was issued",
          example: "June 06, 2019",
        },
        TransactionTime: {
          type: "time",
          description: "Time the receipt was issued",
          example: "4:49 PM",
        },
        Subtotal: {
          type: "number",
          description: "Subtotal of receipt, often before taxes are applied",
          example: "$12.34",
        },
        Tax: {
          type: "number",
          description: "Tax on receipt, often sales tax or equivalent",
          example: "$2.00",
        },
        Tip: {
          type: "number",
          description: "Tip included by buyer",
          example: "$1.00",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            description: "Extracted line item",
            example: "1\nSurface Pro 6\n$999.00\n$999.00",
            properties: {
              TotalPrice: {
                type: "number",
                description: "Total price of line item",
                example: "$999.00",
              },
              Description: {
                type: "string",
                description: "Item description",
                example: "Surface Pro 6",
              },
              Quantity: {
                type: "number",
                description: "Quantity of each item",
                example: "1",
              },
              Price: {
                type: "number",
                description: "Individual price of each item unit",
                example: "$999.00",
              },
            },
          },
        },
      },
    },
    "receipt.gas": {
      description: "Gas receipt",
      fieldSchema: {
        Locale: {
          type: "string",
          enum: ["en-AU", "en-CA", "en-GB", "en-IN", "en-US"],
          description: "Locale",
          example: "en-US",
        },
        MerchantName: {
          type: "string",
          description: "Name of the merchant issuing the receipt",
          example: "Contoso",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
          description: "Listed phone number of merchant",
          example: "987-654-3210",
        },
        MerchantAddress: {
          type: "string",
          description: "Listed address of merchant",
          example: "123 Main St Redmond WA 98052",
        },
        Total: {
          type: "number",
          description: "Full transaction total of receipt",
          example: "$14.34",
        },
        TransactionDate: {
          type: "date",
          description: "Date the receipt was issued",
          example: "June 06, 2019",
        },
        TransactionTime: {
          type: "time",
          description: "Time the receipt was issued",
          example: "4:49 PM",
        },
        Subtotal: {
          type: "number",
          description: "Subtotal of receipt, often before taxes are applied",
          example: "$12.34",
        },
        Tax: {
          type: "number",
          description: "Tax on receipt, often sales tax or equivalent",
          example: "$2.00",
        },
        Tip: {
          type: "number",
          description: "Tip included by buyer",
          example: "$1.00",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            description: "Extracted line item",
            example: "1\nSurface Pro 6\n$999.00\n$999.00",
            properties: {
              TotalPrice: {
                type: "number",
                description: "Total price of line item",
                example: "$999.00",
              },
              Description: {
                type: "string",
                description: "Item description",
                example: "Surface Pro 6",
              },
              Quantity: {
                type: "number",
                description: "Quantity of each item",
                example: "1",
              },
              Price: {
                type: "number",
                description: "Individual price of each item unit",
                example: "$999.00",
              },
            },
          },
        },
      },
    },
    "receipt.parking": {
      description: "Parking receipt",
      fieldSchema: {
        Locale: {
          type: "string",
          enum: ["en-AU", "en-CA", "en-GB", "en-IN", "en-US"],
          description: "Locale",
          example: "en-US",
        },
        MerchantName: {
          type: "string",
          description: "Name of the merchant issuing the receipt",
          example: "Contoso",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
          description: "Listed phone number of merchant",
          example: "987-654-3210",
        },
        MerchantAddress: {
          type: "string",
          description: "Listed address of merchant",
          example: "123 Main St Redmond WA 98052",
        },
        Total: {
          type: "number",
          description: "Full transaction total of receipt",
          example: "$14.34",
        },
        TransactionDate: {
          type: "date",
          description: "Date the receipt was issued",
          example: "June 06, 2019",
        },
        TransactionTime: {
          type: "time",
          description: "Time the receipt was issued",
          example: "4:49 PM",
        },
        Subtotal: {
          type: "number",
          description: "Subtotal of receipt, often before taxes are applied",
          example: "$12.34",
        },
        Tax: {
          type: "number",
          description: "Tax on receipt, often sales tax or equivalent",
          example: "$2.00",
        },
        Tip: {
          type: "number",
          description: "Tip included by buyer",
          example: "$1.00",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            description: "Extracted line item",
            example: "1\nSurface Pro 6\n$999.00\n$999.00",
            properties: {
              TotalPrice: {
                type: "number",
                description: "Total price of line item",
                example: "$999.00",
              },
              Description: {
                type: "string",
                description: "Item description",
                example: "Surface Pro 6",
              },
              Quantity: {
                type: "number",
                description: "Quantity of each item",
                example: "1",
              },
              Price: {
                type: "number",
                description: "Individual price of each item unit",
                example: "$999.00",
              },
            },
          },
        },
      },
    },
    "receipt.hotel": {
      description: "Hotel receipt",
      fieldSchema: {
        MerchantName: {
          type: "string",
          description: "Name of the merchant issuing the receipt",
          example: "Contoso",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
          description: "Listed phone number of merchant",
          example: "987-654-3210",
        },
        MerchantAddress: {
          type: "string",
          description: "Listed address of merchant",
          example: "123 Main St Redmond WA 98052",
        },
        Total: {
          type: "number",
          description: "Full transaction total of receipt",
          example: "$14.34",
        },
        ArrivalDate: {
          type: "date",
          description: "Date of arrival",
          example: "27Mar21",
        },
        DepartureDate: {
          type: "date",
          description: "Date of departure",
          example: "28Mar21",
        },
        Currency: {
          type: "string",
          enum: ["MIXED", "USD", "AUD", "CAD", "INR", "GBP", "EUR"],
          description:
            "Currency unit of receipt amounts (ISO 4217), or 'MIXED' if multiple values are found",
          example: "USD",
        },
        MerchantAliases: {
          type: "array",
          items: {
            type: "string",
            description: "Alternative name of merchant",
            example: "Contoso (R)",
          },
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            description: "Extracted line item",
            example: "1\nSurface Pro 6\n$999.00\n$999.00",
            properties: {
              TotalPrice: {
                type: "number",
                description: "Total price of line item",
                example: "$999.00",
              },
              Description: {
                type: "string",
                description: "Item description",
                example: "Room Charge",
              },
              Date: {
                type: "date",
                description: "Item date",
                example: "27Mar21",
              },
              Category: {
                type: "string",
                enum: ["Room", "Meals", "Tax", "Deposit", "Credit", "Other"],
                description: "Item category",
                example: "Room",
              },
            },
          },
        },
      },
    },
  },
} as const;
